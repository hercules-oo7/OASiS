import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const magazines = await ctx.db
      .query("magazines")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .order("desc")
      .take(args.limit || 10);

    return Promise.all(
      magazines.map(async (magazine) => ({
        ...magazine,
        coverImageUrl: magazine.coverImageId ? await ctx.storage.getUrl(magazine.coverImageId) : null,
        pdfUrl: magazine.pdfId ? await ctx.storage.getUrl(magazine.pdfId) : null,
      }))
    );
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    issue: v.string(),
    publishDate: v.string(),
    coverImageId: v.optional(v.id("_storage")),
    pdfId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("magazines", {
      ...args,
      isPublished: true,
      createdBy: userId,
    });
  },
});
