import { useGetProfile } from "@teliphotos/services";

const useUserProfile = () => {
  const { data, isLoading } = useGetProfile();

  return { data, isLoading };
};

export default useUserProfile;
