import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

// ❌ لا تستخدم useDispatch و useSelector العادية
// ✅ استخدم الـ typed versions
/* 
useDispatch العادية:
- مفيش type safety
- مفيش autocomplete للـ actions

useAppDispatch:
- TypeScript يعرف كل الـ actions
- Autocomplete شغال
- Type-safe
*/

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
