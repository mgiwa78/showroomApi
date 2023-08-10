import { Request, Response } from "express";
import { Post, Organization, User } from "../models";
import { ValidateRequest } from "../middleware/validate-request";
import type { PostImage } from "../models/post";
import { AccessControlInstance } from "../services/access-control";

export const Fetch__POST__POST = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(404).json({ status: "error", error: "Invalid User" });
  }

  if (!req.permissions)
    return res
      .status(403)
      .json({ status: "error", error: "You are not authorized " });

  if (req.permissions.readAny && req.permissions.readAny.granted) {
    console.log(req.permissions.readAny, req.permissions.readAny.granted);

    const posts = await Post.find({});

    return res.send({
      status: "success",
      data: posts
    });
  } else if (req.permissions.readOwn && req.permissions.readOwn.granted) {
    const user = await User.findById(req.user.id);

    const posts = await Post.find({ organization: user?.organization });

    // const filteredPost = req.permissions.readOwn.filter(posts);

    return res.send({
      status: "success",
      data: posts
    });
  } else {
    return res
      .status(403)
      .json({ status: "error", error: "You are not authorized " });
  }
};

export const Create__POST__POST = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ status: "error", error: "Invalid User" });
    }
    if (!req.permissions)
      return res
        .status(403)
        .json({ status: "error", error: "You are not authorized " });

    if (req.permissions.createOwn && req.permissions.createOwn.granted) {
      const { title, description, images, texts, categories } = req.body;

      const user = await User.findById(req.user.id);
      const organization = await Organization.findById(user?.organization);

      console.log(organization);

      if (!organization) {
        return res
          .status(404)
          .json({ status: "error", error: "Organization not found" });
      }

      const post = await Post.create({
        title,
        description,
        images,
        texts,
        categories,
        organization: organization.id
      });

      return res.status(201).json({ status: "success", data: post });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Update__POST__PUT = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ status: "error", error: "Invalid User" });
    }

    const organizationId = req.user.organization;
    const postId = req.params.postId;
    const { title, description, images, texts, categories } = req.body;

    const post = await Post.findOne({
      _id: postId,
      organization: organizationId
    });
    if (!post) {
      return res.status(404).json({ status: "error", error: "Post not found" });
    }

    post.title = title;
    post.description = description;
    post.images = images;
    post.texts = texts;
    post.categories = categories;
    await post.save();

    return res.json({ status: "success", data: post });
  } catch (error) {
    console.error("Error updating post:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Delete__POST__DELETE = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ status: "error", error: "Invalid User" });
    }
    const organizationId = req.user.organization; // Assuming organization ID is available in the request object
    const postId = req.params.postId;
    const imageId = req.params.imageId;

    // Check if the organization owns the post
    const post = await Post.findOne({
      _id: postId,
      organization: organizationId
    });
    if (!post) {
      return res.status(404).json({ status: "error", error: "Post not found" });
    }
    if (post.images) {
      post.images = post?.images.filter(
        (image: PostImage) => image.id.toString() !== imageId
      );
      await post.save();
    }
    return res.json({ status: "success", data: post });
  } catch (error) {
    console.error("Error deleting image from post:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
