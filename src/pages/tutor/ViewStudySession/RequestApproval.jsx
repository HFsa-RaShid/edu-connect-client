import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import Swal from "sweetalert2";

const RequestApproval = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axiosSecure.get(`/sessions/${id}`)
        .then(res => {
          const sessionData = res.data;
          Object.keys(sessionData).forEach(key => {
            setValue(key, sessionData[key]);
          });
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to load session data!",
          });
        });
    }
  }, [id, setValue, axiosSecure]);

  const onSubmit = async (data) => {
    setLoading(true);
    const sessionData = {
      title: data.title,
      tutorName: user.displayName,
      tutorEmail: user.email,
      description: data.description,
      registrationStartDate: data.registrationStartDate,
      registrationEndDate: data.registrationEndDate,
      classStartDate: data.classStartDate,
      classEndDate: data.classEndDate,
      duration: data.duration,
      registrationFee: 0, 
      status: "pending", 
    };

    axiosSecure.put(`/updateSession/tutor/${id}`, sessionData)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Session updated successfully",
          showConfirmButton: false,
          timer: 1500
        });

        reset(); 
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update session!",
        });
        setLoading(false);
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 mt-20">Update Study Session</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-bold">Session Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && <span className="text-red-600">Session title is required</span>}
        </div>
        <div>
          <label className="block font-bold">Tutor Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>
        <div>
          <label className="block font-bold">Tutor Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>
        <div>
          <label className="block font-bold">Session Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && <span className="text-red-600">Description is required</span>}
        </div>
        <div>
          <label className="block font-bold">Registration Start Date</label>
          <input
            type="date"
            {...register("registrationStartDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.registrationStartDate && <span className="text-red-600">Start date is required</span>}
        </div>
        <div>
          <label className="block font-bold">Registration End Date</label>
          <input
            type="date"
            {...register("registrationEndDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.registrationEndDate && <span className="text-red-600">End date is required</span>}
        </div>
        <div>
          <label className="block font-bold">Class Start Date</label>
          <input
            type="date"
            {...register("classStartDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.classStartDate && <span className="text-red-600">Start date is required</span>}
        </div>
        <div>
          <label className="block font-bold">Class End Date</label>
          <input
            type="date"
            {...register("classEndDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.classEndDate && <span className="text-red-600">End date is required</span>}
        </div>
        <div>
          <label className="block font-bold">Session Duration</label>
          <input
            type="text"
            {...register("duration", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.duration && <span className="text-red-600">Duration is required</span>}
        </div>
        <div>
          <label className="block font-bold">Registration Fee</label>
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>
        <div>
          <label className="block font-bold">Status</label>
          <input
            type="text"
            value="pending"
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>
        <button type="submit" className="btn btn-outline border-0 border-b-4 border-t-2 border-black text-xl font-bold w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Session"}
        </button>
      </form>
 
    </div>
  );
};

export default RequestApproval;
