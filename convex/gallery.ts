import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("gallery")
      .order("desc")
      .take(args.limit || 20);

    return Promise.all(
      images.map(async (image) => ({
        ...image,
        imageUrl: await ctx.storage.getUrl(image.imageId),
      }))
    );
  },
});

export const upload = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageId: v.id("_storage"),
    eventId: v.optional(v.id("events")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("gallery", {
      ...args,
      uploadedBy: userId,
    });
  },
});
