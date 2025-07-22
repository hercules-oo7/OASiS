import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getCurrentUserProfile = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return profile;
  },
});

export const createDefaultProfile = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingProfile) return existingProfile;

    const newProfile = await ctx.db.insert("userProfiles", {
      userId,
      role: "student",
      isActive: true,
    });

    return await ctx.db.get(newProfile);
  },
});

export const updateProfile = mutation({
  args: {
    department: v.optional(v.string()),
    year: v.optional(v.string()),
    studentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (profile) {
      await ctx.db.patch(profile._id, args);
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        role: "student",
        isActive: true,
        ...args,
      });
    }
  },
});

export const promoteToExecutive = mutation({
  args: {
    userId: v.id("users"),
    position: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUserId = await getAuthUserId(ctx);
    if (!currentUserId) throw new Error("Not authenticated");

    // Check if current user is admin
    const currentProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", currentUserId))
      .first();

    if (!currentProfile || currentProfile.role !== "admin") {
      throw new Error("Only admins can promote users");
    }

    // Update user profile
    const targetProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (targetProfile) {
      await ctx.db.patch(targetProfile._id, {
        role: "executive",
        position: args.position,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId: args.userId,
        role: "executive",
        position: args.position,
        isActive: true,
      });
    }

    // Add executive position record
    await ctx.db.insert("executivePositions", {
      position: args.position,
      userId: args.userId,
      isActive: true,
      appointedDate: new Date().toISOString().split('T')[0],
    });
  },
});

export const listExecutives = query({
  handler: async (ctx) => {
    const executives = await ctx.db
      .query("userProfiles")
      .withIndex("by_role", (q) => q.eq("role", "executive"))
      .collect();

    return Promise.all(
      executives.map(async (exec) => {
        const user = await ctx.db.get(exec.userId);
        return {
          ...exec,
          user,
        };
      })
    );
  },
});

export const checkIsExecutive = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return profile?.role === "executive" || profile?.role === "admin";
  },
});
