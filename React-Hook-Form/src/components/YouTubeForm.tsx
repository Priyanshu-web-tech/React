import {
  useForm,
  useFieldArray,
  FieldError,
  FieldErrors,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/2"
      );
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        channel: "Codevolution",
        social: {
          facebook: "fb.com",
          twitter: "twitter.com",
        },
        phoneNumbers: ["", ""],
        phNumbers: [
          {
            number: "",
          },
        ],
        age: 0,
        dob: new Date(),
      };
    },

    mode: "onTouched",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  // console.log(touchedFields, dirtyFields, isDirty, isValid);

  console.log("Is Submitting", isSubmitting);
  console.log("Is Submitted", isSubmitted);
  console.log("Is Submit Successfull", isSubmitSuccessful);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Error", errors);
  };

  const handleGetValues = () => {
    console.log("Get values", getValues());
    console.log("Username", getValues("username"));
  };

  const handleSetValue = () => {
    setValue("username", "Codevolution", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // useEffect(() => {
  //   const subscription = watch((value)=>{
  //     console.log(value);
  //   })

  //   return () => subscription.unsubscribe();
  // },[watch]);

  // const watchUsername = watch("username");
  // const watchForm = watch();

  renderCount++;

  return (
    <div>
      <h1>{renderCount}</h1>
      {/* <h2>Watched all form values : {JSON.stringify(watchForm)}</h2>

      <h2>Watched value : {watchUsername}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />

          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) =>
                  fieldValue !== "admin@example.com" ||
                  "Emter a different email address",

                notBlackListed: (fieldValue) =>
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported",

                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
          />

          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel is required" })}
          />

          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: "Twitter is required",
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input
                  type="text"
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                append({ number: "" });
              }}
            >
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />

          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">DOB</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "DOB is required",
            })}
          />

          <p className="error">{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid}>Submit</button>

        <button type="button" onClick={handleGetValues}>
          Get values
        </button>

        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
        <button type="button" onClick={() => trigger("channel")}>
          Validate
        </button>

        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
