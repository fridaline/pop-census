import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const onSubmit = (data) => {
    const age = calculateAge(data.dateOfBirth);

    if (age >= 21) {
      axios
        .post("http://localhost:5555/user", { ...data, age })
        .then(() => {
          toast.success("Registration successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred. Please check console", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      console.log("Form data submitted:", { ...data, age });
    } else {
      alert("Users must be above 21 years old to register.");
    }
  };

  return (
    <div className="my-4 p-8 border rounded-md shadow-md">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-600"
          >
            Date of Birth:
          </label>
          <Controller
            render={({ field }) => (
              <input
                type="date"
                {...field}
                onChange={(e) => {
                  setValue("dateOfBirth", e.target.value);
                  field.onChange(e);
                }}
                className="mt-1 p-2 w-full border rounded-md"
              />
            )}
            control={control}
            name="dateOfBirth"
            rules={{ required: true }}
          />
          {errors.dateOfBirth && (
            <span className="text-red-500">Date of Birth is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600"
          >
            Gender:
          </label>
          <select
            id="gender"
            {...register("gender", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="numChildrenUnder21"
            className="block text-sm font-medium text-gray-600"
          >
            Number of Children Under 21:
          </label>
          <input
            type="number"
            id="numChildrenUnder21"
            {...register("numChildrenUnder21")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="numChildrenAbove21"
            className="block text-sm font-medium text-gray-600"
          >
            Number of Children Above 21:
          </label>
          <input
            type="number"
            id="numChildrenAbove21"
            {...register("numChildrenAbove21")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="placeOfBirth"
            className="block text-sm font-medium text-gray-600"
          >
            Place of birth:
          </label>
          <select
            id="placeOfBirth"
            {...register("placeOfBirth", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select place of birth</option>
            <option value="centre">Centre</option>
            <option value="littoral">Littoral</option>
            <option value="adamaoua">Adamaoua</option>
            <option value="east">East</option>
            <option value="far north">Far North</option>
            <option value="north"> North</option>
            <option value="west">West</option>
            <option value="south">South</option>
            <option value="south-west">South-West</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}
        </div>
        <button
          className="bg-green-500 active:bg-black active:text-white text-white px-4 py-2"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
