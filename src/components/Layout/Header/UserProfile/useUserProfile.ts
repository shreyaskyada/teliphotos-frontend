import { useGetProfile } from "@teliphotos/services";

const useUserProfile = () => {
  const { data, isLoading } = useGetProfile();

  console.log("🚀 ~ useUserProfile ~ data:", data);

  return { data, isLoading };
};

export default useUserProfile;
