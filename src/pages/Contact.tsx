import { useCallback, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";
import { Mail, Instagram, Send } from "lucide-react";
import { GlassIcon } from "@/components/reactbits/GlassIcon";
import { RippleGridBackground } from "@/components/reactbits/RippleGridBackground";
import { useContactForm } from "@/hooks/useContactForm";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

type ContactFormState = typeof initialFormState;

const Contact = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const { mutate: submitContact, isPending } = useContactForm();

  const resetForm = useCallback(() => {
    setFormData(() => ({ ...initialFormState }));
    setErrors({});
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    submitContact(formData, {
      onSuccess: () => {
        toast({
          title: t("contact.messageSent"),
          description: t("contact.messageSentDesc"),
        });
        resetForm();
      },
      onError: (error) => {
        toast({
          title: t("contact.errorSending"),
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error for this field when user starts typing
      if (errors[name as keyof ContactFormState]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors],
  );

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance drop-shadow-[0_12px_32px_rgba(6,10,28,0.65)]">
              {t("contact.title").split(" ")[0]} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("contact.title").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-white/90 leading-relaxed text-balance drop-shadow-[0_10px_24px_rgba(5,6,20,0.55)]">
              {t("contact.description")}
            </p>
          </div>
        </SectionReveal>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-transparent p-2 sm:rounded-[2.5rem] sm:p-4">
          <RippleGridBackground />
          <div className="relative z-10 rounded-[1.75rem] p-6 text-white backdrop-blur-2xl sm:rounded-[2.25rem] sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Contact Info */}
              <div className="col-span-1">
                <SectionReveal delay={0.1}>
                  <div className="space-y-8 text-white drop-shadow-[0_10px_30px_rgba(4,8,24,0.6)]">
                    <div>
                      <h2 className="mb-6 text-[clamp(1.5rem,5.5vw,2.5rem)] font-bold leading-tight text-white">
                        {t("contact.letsConnect")}
                      </h2>
                      <p className="mb-6 text-[clamp(1rem,3.3vw,1.1rem)] text-white/85 leading-relaxed">
                        {t("contact.connectDesc")}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <GlassIcon
                        icon={<Mail className="h-6 w-6" />}
                        title={t("contact.email")}
                        description="contact@artleo.com"
                        href="mailto:contact@artleo.com"
                      />
                      <GlassIcon
                        icon={<Instagram className="h-6 w-6" />}
                        title={t("contact.instagram")}
                        description="@leonardossil"
                        href="https://www.instagram.com/leonardossil/"
                      />
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Contact Form */}
              <div className="col-span-1">
                <SectionReveal delay={0.2}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.namePlaceholder")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.emailLabel")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.emailPlaceholder")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.message")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contact.messagePlaceholder")}
                        rows={6}
                        className={`resize-none ${errors.message ? "border-destructive" : ""}`}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full motion-reduce:transition-none"
                      disabled={isPending}
                    >
                      {isPending ? (
                        t("contact.sending")
                      ) : (
                        <>
                          {t("contact.sendMessage")}
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
