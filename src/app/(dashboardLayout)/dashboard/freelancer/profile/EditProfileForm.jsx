"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Input, TextArea, Label, Button } from "@heroui/react";
import { FiPlus, FiX } from "react-icons/fi";
import { updateUser } from "@/lib/actions/users";

export default function EditProfileForm({ defaultData }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    skills: [],
    bio: "",
    hourlyRate: "",
  });

  useEffect(() => {
    if (!defaultData) return;

    setFormData({
      name: defaultData?.name || "",
      skills: defaultData?.skills || [],
      bio: defaultData?.bio || "",
      hourlyRate: defaultData?.hourlyRate?.toString() || "",
    });
  }, [defaultData]);
  console.log(defaultData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (formData.skills.includes(skill)) return;

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser(defaultData.email, {
        name: formData.name,
        bio: formData.bio,
        skills: formData.skills,
        hourlyRate: Number(formData.hourlyRate),
      });

      router.refresh();
      alert("Profile updated");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>

          <p className="text-zinc-500">Update your freelancer profile</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label>Name</Label>

            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <Label>Skills</Label>

            <div className="flex gap-2">
              <Input
                placeholder="Add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />

              <Button type="button" onClick={addSkill}>
                <FiPlus />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full border flex items-center gap-2"
                >
                  {skill}

                  <button type="button" onClick={() => removeSkill(index)}>
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <Label>Bio</Label>

            <TextArea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
          </div>

          {/* Hourly Rate */}
          <div className="flex flex-col gap-2">
            <Label>Hourly Rate</Label>

            <Input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => handleChange("hourlyRate", e.target.value)}
            />
          </div>

          <Button type="submit" isDisabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
