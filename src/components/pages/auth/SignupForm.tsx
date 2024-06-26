import { signup } from "@/api/auth";
import IconEye from "@/components/icons/IconEye";
import IconEyeSlash from "@/components/icons/IconEyeSlash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  changeStatus: (status: boolean) => void;
  color: string;
};

interface IFormData {
  email: string;
  password: string;
  fullName: string;
}

const SignupForm = ({ changeStatus, color }: Props) => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    fullName: "",
  });
  const [isDisplayPassword, setIsDisplayPassword] = useState<boolean>(false);
  const [isExistedEmail, setIsExistedEmail] = useState<boolean>(false);
  const handleSignup = async () => {
    try {
      const res = await signup(formData);
      if (Object.keys(res.data).length > 0) {
        changeStatus(true);
        toast("Đăng ký!");
      } else {
        setIsExistedEmail(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayPassword = () => {
    setIsDisplayPassword(!isDisplayPassword);
  };

  useEffect(() => {
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
      passwordInput.setAttribute(
        "type",
        isDisplayPassword ? "text" : "password"
      );
    }
  }, [isDisplayPassword]);

  useEffect(() => {
    setIsExistedEmail(false);
  }, [formData.email]);

  return (
    <div className="tw-w-[80%]">
      <div className="tw-w-full tw-flex tw-justify-center tw-mb-3">
        <span className="tw-text-[16px]">Đăng ký</span>
      </div>
      <div className="tw-w-full tw-flex tw-justify-center tw-flex-col">
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="Gmail"
          className="tw-outline-none tw-border tw-py-2 tw-px-4 tw-w-full dark:focus:tw-border-dark focus:tw-border-light tw-rounded-xl dark:tw-bg-[#1e1e1e]"
        />
        <span
          className="tw-mt-2 tw-ml-2"
          style={{
            display: isExistedEmail ? "block" : "none",
          }}
        >
          Tài khoản đã tồn tại
        </span>
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
      <div className="tw-w-full tw-flex tw-justify-center tw-mt-3">
        <input
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder="Fullname"
          type="text"
          className="tw-outline-none tw-border tw-py-2 tw-px-4 tw-w-full dark:focus:tw-border-dark focus:tw-border-light tw-rounded-xl dark:tw-bg-[#1e1e1e]"
        />
      </div>
      <button
        className="tw-mt-3 dark:tw-bg-dark tw-bg-light tw-w-full tw-py-2 tw-rounded-xl tw-bg-opacity-90 hover:tw-bg-opacity-100"
        onClick={handleSignup}
      >
        <span className="tw-text-[14px] tw-text-dark dark:tw-text-light">
          Đăng ký
        </span>
      </button>
      <div className="tw-mt-3">
        <span>Đã có tài khoản?</span>
        <span
          className="tw-underline tw-cursor-pointer tw-ml-1"
          onClick={() => changeStatus(true)}
        >
          Đăng nhập
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
