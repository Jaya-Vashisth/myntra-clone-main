// import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const { loading } = useSelector((store) => store.auth);

  //handle the inputs fields when updated
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setformData({
      ...formData,
      [name]: value,
    });
  };

  //handle the logged in details
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // try {
    //   //post request
    //   dispatch(setLoading(true));
    //   const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   });

    //   //if created successfully
    //   if (res.data.success) {
    //     dispatch(setUser(res.data.user));
    //     navigate("/");
    //     toast.success(res.data.message);
    //   }
    // } catch (error) {
    //   // console.log(error);
    //   toast.error(error.response.data.message);
    // } finally {
    //   dispatch(setLoading(false));
    // }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold tex-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              placeholder="xyz@gmail.com"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="flex items-center justify-between font-medium">
            <RadioGroup
              className="flex items-center gap-4"
              onChange={handleChange}
            >
              <div className="flex  items-center space-x-2">
                <Input
                  type="radio"
                  checked={formData.role === "recruiter"}
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  id="recruiter"
                />
                <Label htmlFor="role">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  checked={formData.role === "user"}
                  name="role"
                  value="user"
                  id="user"
                  className="cursor-pointer"
                />
                <Label htmlFor="role">User</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full m-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                className="w-full my-3"
                onSubmit={handleSubmit}
              >
                Login
              </Button>

              <span className="text-sm">
                Don&rsquo;t have an account?{" "}
                <Link to="/signup" className=" hover: text-blue-900">
                  Sign up
                </Link>
              </span>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
