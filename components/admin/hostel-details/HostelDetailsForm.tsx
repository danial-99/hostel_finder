/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileUpload from "./ProfileUpload";
import HostelInfoInputs from "./HostelInfoInputs";
import RoomDetails from "./RoomDetails";
import PhotoUpload from "./PhotoUpload";
import axios from "axios";
import { string } from "zod";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { createHostel } from "@/actions/admin/createHostel";
import { useAuth } from "@/hooks/useAuth";

export default function HostelDetailsForm() {
  const [formData, setFormData] = useState({
    hostelName: "",
    ownerName: "",
    hostelLocation: "",
    hostelType: "",
    roomDetails: "",
    image: [],
    avatar: "",
  });
  // const [avatar, setAvatar] = useState<string>("");
  // const [files, setFiles] = useState<[] | any>([]);

  const {user} = useAuth()
  const userId = user?.id as string

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cloudinary/upload-image-to-cloudinary",
        formData
      );

      const imageUrl = response?.data?.url;
      if (imageUrl) {
        setFormData((prevFiles: any) => ({ ...prevFiles, image: [...prevFiles.image, imageUrl] }));
        return imageUrl;  // Return URL if needed elsewhere
      } else {
        console.error("Image URL not found in response.");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const uploadAvatrTOcloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cloudinary/upload-image-to-cloudinary",
        formData
      );

      const imageUrl = response?.data?.url;
      if (imageUrl) {
        setFormData((prev) => ({ ...prev, avatar: imageUrl }))
        return imageUrl;  // Return URL if needed elsewhere
      } else {
        console.error("Image URL not found in response.");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  }

  // console.log(files)

  console.log(formData)


  const validateForm = () => {
    switch (true) {
      case (!formData.avatar || formData.avatar.trim() === ""):
        toast({
          title: "Missing Required Fields",
          description: "Avatar is required",
          variant: "destructive",
        });
        return false;
      case (!formData.hostelLocation || formData.hostelLocation.trim() === ""):
        toast({
          title: "Missing Required Fields",
          description: "Hostel Location is required",
          variant: "destructive",
        });
        return false
      case (!formData.hostelName || formData.hostelName.trim() === ""):
        toast({
          title: "Missing Required Fields",
          description: "Hostel Name is required",
          variant: "destructive",
        });
        return false
      case (!formData.hostelType || formData.hostelType.trim() === ""):
        toast({
          title: "Missing Required Fields",
          description: "Hostel Type is required",
          variant: "destructive",
        });
        return false
      case (!formData.ownerName || formData.ownerName.trim() === ""):
        toast({
          title: "Missing Required Fields",
          description: "Owner name is required",
          variant: "destructive",
        });
        return false;
      case (!formData.roomDetails || formData.roomDetails.trim() === ""):
        toast({
          title: "Missing Required Fields",
          description: "Description is required",
          variant: "destructive",
        });
        return false;
      case (!formData.image || formData.image.length < 1):
        toast({
          title: "Missing Required Fields",
          description: "Atleast one image is required",
          variant: "destructive",
        });
        return false;
      default:
        return true;
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        console.log("good to go")
        const fieldsData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          if (typeof value === "string" || value instanceof Blob) {
            // Append strings and Blobs directly
            fieldsData.append(key, value);
          } else if (Array.isArray(value)) {
            // Append array elements as individual items
            value.forEach((item, index) => {
              fieldsData.append(`${key}[${index}]`, String(item)); // Convert each item to a string
            });
          } else if (value !== null && value !== undefined) {
            // Convert other types to strings if necessary
            fieldsData.append(key, String(value));
          }
        });

        console.log(fieldsData)

        const response = await createHostel(fieldsData, userId)
        console.log(response)


      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Internal Error",
        description: "Internal server error try again later!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <Card className="w-full max-w-7xl mx-auto pt-5">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <ProfileUpload avatar={formData.avatar} uploadAvatrTOcloudinary={uploadAvatrTOcloudinary} />
            <HostelInfoInputs
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <div className="block lg:flex justify-between items-center gap-x-3 w-full">
              <div className="w-full lg:w-6/12">
                <RoomDetails
                  value={formData.roomDetails}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full lg:w-6/12">
                <PhotoUpload uploadImageTOCloudinary={uploadImageToCloudinary} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-x-3">
            <Button className="w-2/12" variant="outline" type="button">
              Cancel
            </Button>
            <Button className="w-3/12" type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* uploaded images listing */}
      <div className="space-y-2">
        <h1 className="text-md font-medium">Your Image Uploads</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3">
          {formData.image.map((image, index) => (
            <div key={index} className="relative w-full h-[200px] rounded-md overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={image}
                alt="Uploaded Image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
