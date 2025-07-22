import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("desc")
      .take(args.limit || 20);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("notifications", {
      ...args,
      isActive: true,
      createdBy: userId,
    });
  },
});
