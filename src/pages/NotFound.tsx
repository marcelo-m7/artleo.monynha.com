import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="space-y-4 text-center text-foreground">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-lg text-muted-foreground text-balance">
          {t("notFound.description")}
        </p>
        <Button asChild>
          <Link to="/">{t("notFound.goHome")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
