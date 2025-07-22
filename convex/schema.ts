import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    type: v.union(v.literal("workshop"), v.literal("seminar"), v.literal("competition"), v.literal("meeting")),
    imageId: v.optional(v.id("_storage")),
    isActive: v.boolean(),
    createdBy: v.id("users"),
  }).index("by_date", ["date"])
    .index("by_type", ["type"])
    .index("by_active", ["isActive"]),

  notifications: defineTable({
    title: v.string(),
    content: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    isActive: v.boolean(),
    createdBy: v.id("users"),
  }).index("by_priority", ["priority"])
    .index("by_active", ["isActive"]),

  magazines: defineTable({
    title: v.string(),
    description: v.string(),
    issue: v.string(),
    publishDate: v.string(),
    coverImageId: v.optional(v.id("_storage")),
    pdfId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    createdBy: v.id("users"),
  }).index("by_published", ["isPublished"])
    .index("by_date", ["publishDate"]),

  certificates: defineTable({
    studentName: v.string(),
    studentEmail: v.string(),
    studentId: v.string(),
    eventTitle: v.string(),
    eventDate: v.string(),
    certificateType: v.union(v.literal("participation"), v.literal("completion"), v.literal("achievement")),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    requestedBy: v.id("users"),
    reviewedBy: v.optional(v.id("users")),
    reviewNotes: v.optional(v.string()),
  }).index("by_status", ["status"])
    .index("by_student", ["studentEmail"])
    .index("by_requester", ["requestedBy"]),

  gallery: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    imageId: v.id("_storage"),
    eventId: v.optional(v.id("events")),
    uploadedBy: v.id("users"),
  }).index("by_event", ["eventId"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    role: v.union(v.literal("student"), v.literal("executive"), v.literal("admin")),
    department: v.optional(v.string()),
    year: v.optional(v.string()),
    studentId: v.optional(v.string()),
    position: v.optional(v.string()), // For executives: President, Vice President, etc.
    isActive: v.boolean(),
  }).index("by_user", ["userId"])
    .index("by_role", ["role"])
    .index("by_active", ["isActive"]),

  executivePositions: defineTable({
    position: v.string(), // President, Vice President, Secretary, Treasurer, Technical Head
    userId: v.id("users"),
    isActive: v.boolean(),
    appointedDate: v.string(),
  }).index("by_position", ["position"])
    .index("by_user", ["userId"])
    .index("by_active", ["isActive"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
