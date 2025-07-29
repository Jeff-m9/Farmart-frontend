import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z
    .number({ invalid_type_error: "Phone number must be a number" })
    .int()
    .nonnegative()
    .min(100000000, "Too short")
    .max(999999999999999, "Too long"),
  password: z.string().min(5, "Password is required to confirm changes"),
  role: z.enum(["user", "farmer", "admin"]),
});

function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      reset({
        first_name: parsedUser.first_name,
        last_name: parsedUser.last_name,
        email: parsedUser.email,
        phone_number: parsedUser.phone_number,
        password: "",
        role: parsedUser.role || "user",
      });
    }
  }, [reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:5000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Profile updated. Please log in again.");
      navigate("/login");
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  if (!user) {
    return <p className="text-center mt-12">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-[#f1f8e9] flex items-center justify-center px-4">
      <div className="bg-[#eaf5d5] p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              {...register("first_name")}
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              {...register("last_name")}
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone_number"
              type="number"
              {...register("phone_number", { valueAsNumber: true })}
              placeholder="Phone Number"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role")}
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="user">User</option>
              <option value="farmer">Farmer</option>
              {user.role === "admin" && <option value="admin">Admin</option>}
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter password to confirm changes
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
