"use client";

import { useState } from "react";
import { Plus, Edit2, Eye, EyeOff, Check, X, Shield, Sparkles } from "lucide-react";
import { createPlan, updatePlan, togglePlanActive } from "@/lib/actions/plan.actions";
import { toast } from "sonner";

interface PlanManagerClientProps {
  initialPlans: any[];
}

export default function PlanManagerClient({ initialPlans }: PlanManagerClientProps) {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [durationMonths, setDurationMonths] = useState(3);
  const [baseMonthlyPrice, setBaseMonthlyPrice] = useState(2199);
  const [discountPercentage, setDiscountPercentage] = useState(12);
  const [allowPartialPayment, setAllowPartialPayment] = useState(true);
  const [minUpfrontPercentage, setMinUpfrontPercentage] = useState(50);
  const [featuresText, setFeaturesText] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const openCreateModal = () => {
    setEditingPlan(null);
    setName("");
    setDescription("");
    setDurationMonths(3);
    setBaseMonthlyPrice(2499);
    setDiscountPercentage(10);
    setAllowPartialPayment(true);
    setMinUpfrontPercentage(50);
    setFeaturesText("All clubs access, Biometric assessment, Mobile app");
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (plan: any) => {
    setEditingPlan(plan);
    setName(plan.name);
    setDescription(plan.description);
    setDurationMonths(plan.durationMonths);
    setBaseMonthlyPrice(plan.baseMonthlyPrice);
    setDiscountPercentage(plan.discountPercentage || 0);
    setAllowPartialPayment(plan.allowPartialPayment ?? true);
    setMinUpfrontPercentage(plan.minUpfrontPercentage || 50);
    setFeaturesText(Array.isArray(plan.features) ? plan.features.join("\n") : "");
    setIsPopular(Boolean(plan.isPopular));
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id: string) => {
    const res = await togglePlanActive(id);
    if (res.success) {
      setPlans((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isActive: res.isActive } : p))
      );
      toast.success(res.isActive ? "Plan activated" : "Plan archived");
    } else {
      toast.error(res.error || "Failed to update plan status");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const features = featuresText
      .split(/[\n,]/)
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name,
      description,
      durationMonths: Number(durationMonths),
      baseMonthlyPrice: Number(baseMonthlyPrice),
      discountPercentage: Number(discountPercentage),
      allowPartialPayment,
      minUpfrontPercentage: Number(minUpfrontPercentage),
      features,
      isPopular,
    };

    if (editingPlan) {
      const res = await updatePlan(editingPlan._id, payload);
      if (res.success) {
        setPlans((prev) =>
          prev.map((p) => (p._id === editingPlan._id ? res.plan : p))
        );
        toast.success("Plan updated successfully (Version incremented if price changed)");
        setIsModalOpen(false);
      } else {
        toast.error(res.error || "Failed to update plan");
      }
    } else {
      const res = await createPlan(payload);
      if (res.success) {
        setPlans((prev) => [...prev, res.plan]);
        toast.success("New subscription plan created");
        setIsModalOpen(false);
      } else {
        toast.error(res.error || "Failed to create plan");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
            Plan Management
          </h1>
          <p className="text-xs text-[#8888a0] mt-1">
            Configure tiered fitness memberships, upfront installment rules, and pricing snapshots.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] font-semibold text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Plan
        </button>
      </div>

      {/* Plans List Table/Cards */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-[#8888a0]">
              <tr>
                <th className="py-3.5 px-4">Plan Name & Details</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Monthly Rate</th>
                <th className="py-3.5 px-4">Plan Discount</th>
                <th className="py-3.5 px-4">Partial Pay</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {plans.map((plan) => (
                <tr key={plan._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#f0f0f5] flex items-center gap-2">
                      <span>{plan.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#8888a0]">
                        v{plan.version || 1}
                      </span>
                      {plan.isPopular && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff]">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#8888a0] max-w-xs truncate mt-0.5">
                      {plan.description}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#f0f0f5]">
                    {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#00f0ff]">
                    ₹{plan.baseMonthlyPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#ffd700]">
                    {plan.discountPercentage}% OFF
                  </td>
                  <td className="py-4 px-4">
                    {plan.allowPartialPayment ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00e676]">
                        <Check className="w-3 h-3" /> Min {plan.minUpfrontPercentage}%
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#8888a0]">Full Only</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        plan.isActive
                          ? "bg-[#00e676]/10 text-[#00e676]"
                          : "bg-white/5 text-[#8888a0]"
                      }`}
                    >
                      {plan.isActive ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(plan)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#f0f0f5] transition-colors"
                        title="Edit Plan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(plan._id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#8888a0] hover:text-white transition-colors"
                        title={plan.isActive ? "Archive Plan" : "Activate Plan"}
                      >
                        {plan.isActive ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#12121a] border border-white/10 shadow-2xl p-6 text-[#f0f0f5] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-lg font-heading font-bold text-[#f0f0f5]">
                {editingPlan ? `Edit Plan (Version ${editingPlan.version || 1})` : "Create Subscription Plan"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8888a0] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                  Plan Display Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pro Hypertrophy 90-Day"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                  Plan Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of target athletic goals"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Duration (Months)
                  </label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1a2e] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value={1}>1 Month</option>
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Base Monthly Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={baseMonthlyPrice}
                    onChange={(e) => setBaseMonthlyPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Plan Discount (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Min Upfront Installment (%)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={minUpfrontPercentage}
                    onChange={(e) => setMinUpfrontPercentage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f0f0f5]">
                  <input
                    type="checkbox"
                    checked={allowPartialPayment}
                    onChange={(e) => setAllowPartialPayment(e.target.checked)}
                    className="rounded bg-white/5 border-white/20 text-[#00f0ff]"
                  />
                  <span>Allow Partial Payments</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f0f0f5]">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded bg-white/5 border-white/20 text-[#00f0ff]"
                  />
                  <span>Mark as Most Popular</span>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                  Key Features (One per line or comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="24/7 Access&#10;Sauna Privileges&#10;Biometric Tracking"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#8888a0] text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] text-xs font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
