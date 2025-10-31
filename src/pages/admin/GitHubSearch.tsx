import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { GitHubRepoSearch } from "@/components/GitHubRepoSearch";

const GitHubSearchPage = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold">GitHub Repository Search</h1>
          <p className="text-muted-foreground">
            Search and discover GitHub repositories for reference or inspiration
          </p>
        </div>

        <GitHubRepoSearch />
      </div>
    </div>
  );
};

export default GitHubSearchPage;
