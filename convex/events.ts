import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("events")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("desc")
      .take(args.limit || 10);

    return Promise.all(
      events.map(async (event) => ({
        ...event,
        imageUrl: event.imageId ? await ctx.storage.getUrl(event.imageId) : null,
      }))
    );
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.id);
    if (!event) return null;

    return {
      ...event,
      imageUrl: event.imageId ? await ctx.storage.getUrl(event.imageId) : null,
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    type: v.union(v.literal("workshop"), v.literal("seminar"), v.literal("competition"), v.literal("meeting")),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("events", {
      ...args,
      isActive: true,
      createdBy: userId,
    });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.storage.generateUploadUrl();
  },
});
