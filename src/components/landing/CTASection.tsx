import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Введите имя (минимум 2 символа)"),
  company: z.string().min(2, "Введите название компании"),
  email: z.string().email("Введите корректный рабочий email"),
  docType: z.string().min(1, "Выберите тип документа"),
});

type FormData = z.infer<typeof schema>;

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    // Simulate async request (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    toast.success("Заявка отправлена! Мы свяжемся с вами в течение рабочего дня.");
  };

  return (
    <section id="cta" className="bg-surface-muted py-20 lg:py-28">
      <div className="mx-auto grid max-w-container gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink lg:text-4xl">
            Покажем, как DocuPilot собирает документ на&nbsp;вашем реальном кейсе
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-text">
            Оставьте заявку, и мы проведем демо на шаблоне ТЗ, ЧТЗ или постановки, с которыми работает ваша команда.
          </p>
          <p className="mt-6 text-xs text-text-muted">
            Подходит для integrator, delivery и analyst-команд
          </p>
        </motion.div>

        {/* Right — form / success */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-line bg-surface p-6 shadow-dp-md lg:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <h3 className="text-xl font-semibold text-ink">Заявка принята!</h3>
              <p className="max-w-xs text-sm text-text">
                Мы свяжемся с вами в течение рабочего дня, чтобы согласовать время демо.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-5">
                {(
                  [
                    { label: "Имя", name: "name", type: "text", placeholder: "Как вас зовут" },
                    { label: "Компания", name: "company", type: "text", placeholder: "Название компании" },
                    { label: "Рабочий email", name: "email", type: "email", placeholder: "you@company.com" },
                  ] as const
                ).map((f) => (
                  <div key={f.name}>
                    <label className="mb-1.5 block text-xs font-medium text-ink">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      {...register(f.name)}
                      aria-invalid={!!errors[f.name]}
                      className={`h-11 w-full rounded-md border bg-surface-muted px-4 text-sm text-ink outline-none transition-all placeholder:text-text-muted focus:ring-2 focus:ring-brand/20 ${
                        errors[f.name]
                          ? "border-danger focus:border-danger"
                          : "border-line focus:border-brand"
                      }`}
                    />
                    {errors[f.name] && (
                      <p className="mt-1 text-xs text-danger">{errors[f.name]?.message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink">
                    Что вы хотите собирать?
                  </label>
                  <select
                    {...register("docType")}
                    aria-invalid={!!errors.docType}
                    className={`h-11 w-full rounded-md border bg-surface-muted px-4 text-sm text-ink outline-none transition-all focus:ring-2 focus:ring-brand/20 ${
                      errors.docType
                        ? "border-danger focus:border-danger"
                        : "border-line focus:border-brand"
                    }`}
                  >
                    <option value="">Выберите тип документа</option>
                    <option value="tz">ТЗ</option>
                    <option value="chtz">ЧТЗ</option>
                    <option value="postanovki">Постановки</option>
                    <option value="multi">Несколько типов документов</option>
                  </select>
                  {errors.docType && (
                    <p className="mt-1 text-xs text-danger">{errors.docType.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-primary-foreground shadow-dp-sm transition-all hover:bg-brand-hover hover:shadow-dp-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Отправляем..." : "Запросить демо"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
