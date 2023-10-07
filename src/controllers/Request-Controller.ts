import { Request, Response } from "express";
import { Organization, RequestModel, User } from "../models";
import generateVerificationToken from "../services/organization-token";
import sendApproveSuccessMail from "../services/sendApproveSuccessMail";
import sendConfirmRequestMail from "../services/sendConfirmRequestMail";
import { createToken } from "../services/tokenMethods";
import { Password } from "../services/password";

export const Create__REQUEST__POST = async (req: Request, res: Response) => {
  try {
    const { organizationDetails, contactPerson } = req.body;

    const request = await RequestModel.create({
      organizationDetails: {
        name: organizationDetails.name,
        address: organizationDetails.address,
        email: organizationDetails.email,
        description: organizationDetails.description,
        officeNumber: organizationDetails.officeNumber
      },
      contactPerson: {
        lastName: contactPerson.lastName,
        firstName: contactPerson.firstName,
        email: contactPerson.email,
        phoneNumber: contactPerson.phoneNumber,
        companyRole: contactPerson.companyRole
      }
    });

    sendConfirmRequestMail(contactPerson.email);
    sendConfirmRequestMail(organizationDetails.email);

    return res.status(201).json({ status: "success", data: request });
  } catch (error) {
    console.error("Error creating request:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Approve__REQUEST__PUT = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const newRequest = await RequestModel.findById(requestId);

    if (!newRequest) {
      return res
        .status(404)
        .json({ status: "error", error: "Request not found" });
    }

    const organization = await Organization.create({
      name: newRequest.organizationDetails.name,
      description: newRequest.organizationDetails.description,
      email: newRequest.organizationDetails.email,
      address: newRequest.organizationDetails.address
    });

    const OrgverificationToken = await generateVerificationToken({
      organizationId: organization.id,
      organizationName: organization.name
    });

    organization.verificationToken = OrgverificationToken;
    organization.save();
    console.log(newRequest);

    const hashedPassword = await Password.toHash("Password");

    await User.create({
      email: newRequest.contactPerson.email,
      password: hashedPassword,
      role: ["Organization Admin"],
      lastName: newRequest.contactPerson.lastName,
      firstName: newRequest.contactPerson.firstName,
      organization: organization._id
    });

    newRequest.status = "approved";
    await newRequest.save();

    await createToken(organization._id, OrgverificationToken, 10, 40);

    sendApproveSuccessMail(
      newRequest.contactPerson.email,
      OrgverificationToken
    );

    return res.json({ status: "success", data: organization });
  } catch (error) {
    console.error("Error approving request:", error);
    return res
      .status(404)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__REQUEST__GET = async (req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find();
    return res.json({ status: "success", data: requests });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
