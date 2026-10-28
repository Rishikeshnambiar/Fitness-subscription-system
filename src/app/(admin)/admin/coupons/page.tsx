import { getCoupons } from "@/lib/actions/coupon.actions";
import CouponManagerClient from "@/components/admin/CouponManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const coupons = await getCoupons();
  return <CouponManagerClient initialCoupons={coupons} />;
}
