import { useGetProfile } from "@telephotos/services";

const useUserProfile = () => {
  const { data, isLoading } = useGetProfile();

  return { data, isLoading };
};

export default useUserProfile;
