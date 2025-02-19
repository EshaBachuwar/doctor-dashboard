"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  setTodayVisitCount,
  SET_TODAY_VISIT_COUNT,
  SET_WEEK_VISIT_COUNT,
  SET_MONTH_VISIT_COUNT,
} from "@/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginRequest());

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        try {
          const res = await fetch(`/api/doctor/${data.doctor.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (res.ok) {
            const doc = await res.json();
            localStorage.setItem("todayVisitCount", doc.todayVisitCount);
            localStorage.setItem("weekVisitCount", doc.weekVisitCount);
            localStorage.setItem("monthVisitCount", doc.monthVisitCount);
            dispatch({
              type: SET_TODAY_VISIT_COUNT,
              payload: doc.todayVisitCount,
            });
            dispatch({
              type: SET_WEEK_VISIT_COUNT,
              payload: doc.weekVisitCount,
            });
            dispatch({
              type: SET_MONTH_VISIT_COUNT,
              payload: doc.monthVisitCount,
            });
          }
        } catch (error) {
          console.error("Error fetching today's visits", error);
        }
        dispatch(loginSuccess(data));
        router.push("/dashboard");
      } else {
        dispatch(loginFailure(data.message || "Login failed"));
      }
    } catch (err) {
      dispatch(loginFailure("An error occurred during login"));
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-black">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto text-black"
      >
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <Link href="/register" className="text-blue-500 mt-5">
        Don't have an account? Register
      </Link>
    </div>
  );
};
