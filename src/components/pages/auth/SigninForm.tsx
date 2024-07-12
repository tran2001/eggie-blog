import { signin } from "@/api/auth";
import IconEye from "@/components/icons/IconEye";
import IconEyeSlash from "@/components/icons/IconEyeSlash";
import { RootState } from "app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/features/auth";

type Props = {
  changeStatus: (status: boolean) => void;
  color: string;
};

interface IFormData {
  email: string;
  password: string;
}

const SigninForm = ({ changeStatus, color }: Props) => {
  //init
  const dispatch = useDispatch();

  //store

  const { value: isLoggedIn } = useSelector(
    (state: RootState) => state.authState
  );

  //state
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });
  const [isDisplayPassword, setIsDisplayPassword] = useState<boolean>(false);

  //function
  const handleSignin = async () => {
    if (!formData.email || !formData.password) {
      return;
    }
    try {
      const res = await signin(formData);
      if (res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        dispatch(login());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayPassword = () => {
    setIsDisplayPassword(!isDisplayPassword);
  };

  //useEffect
  useEffect(() => {
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
      passwordInput.setAttribute(
        "type",
        isDisplayPassword ? "text" : "password"
      );
    }
  }, [isDisplayPassword]);

  return (
    <div className="tw-w-[80%]">
      <div className="tw-w-full tw-flex tw-justify-center tw-mb-3">
        <span className="tw-text-[16px] title-text">Đăng nhập</span>
      </div>
      <div className="tw-w-full tw-flex tw-justify-center">
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="Gmail"
          className="tw-outline-none tw-border tw-py-2 tw-px-4 tw-w-full dark:focus:tw-border-dark focus:tw-border-light tw-rounded-xl dark:tw-bg-[#1e1e1e]"
        />
      </div>
      <div className="tw-w-full tw-flex tw-justify-center tw-mt-3 tw-relative">
        <input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
          type="password"
          id="passwordInput"
          className="tw-outline-none tw-border tw-py-2 tw-px-4 tw-w-full dark:focus:tw-border-dark focus:tw-border-light tw-rounded-xl dark:tw-bg-[#1e1e1e]"
        />
        <div
          className="tw-absolute tw-top-1/2 tw-right-3 -tw-translate-y-1/2 tw-cursor-pointer"
          onClick={() => displayPassword()}
          style={{
            display: isDisplayPassword ? "none" : "",
          }}
        >
          <IconEye color={color} />
        </div>
        <div
          className="tw-absolute tw-top-1/2 tw-right-3 -tw-translate-y-1/2 tw-cursor-pointer"
          onClick={() => displayPassword()}
          style={{
            display: isDisplayPassword ? "" : "none",
          }}
        >
          <IconEyeSlash color={color} />
        </div>
      </div>
      <button
        className="tw-mt-3 dark:tw-bg-dark tw-bg-light tw-w-full tw-py-2 tw-rounded-xl tw-bg-opacity-90 hover:tw-bg-opacity-100"
        onClick={handleSignin}
      >
        <span className="tw-text-[14px] tw-text-dark dark:tw-text-light">
          Đăng nhập
        </span>
      </button>
      <div className="tw-mt-3">
        <span>Chưa có tài khoản?</span>
        <span
          className="tw-underline tw-cursor-pointer tw-ml-1"
          onClick={() => changeStatus(false)}
        >
          Đăng ký
        </span>
      </div>
    </div>
  );
};

export default SigninForm;
