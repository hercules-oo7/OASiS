import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const request = mutation({
  args: {
    studentName: v.string(),
    studentEmail: v.string(),
    studentId: v.string(),
    eventTitle: v.string(),
    eventDate: v.string(),
    certificateType: v.union(v.literal("participation"), v.literal("completion"), v.literal("achievement")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("certificates", {
      ...args,
      status: "pending",
      requestedBy: userId,
    });
  },
});

export const listPending = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db
      .query("certificates")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("desc")
      .collect();
  },
});

export const listMyRequests = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db
      .query("certificates")
      .withIndex("by_requester", (q) => q.eq("requestedBy", userId))
      .order("desc")
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    certificateId: v.id("certificates"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
    reviewNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(args.certificateId, {
      status: args.status,
      reviewedBy: userId,
      reviewNotes: args.reviewNotes,
    });
  },
});
