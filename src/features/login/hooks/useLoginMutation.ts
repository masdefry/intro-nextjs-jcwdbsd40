import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LoginAdminRequest } from '../validations/loginSchema';
import { loginApi } from '@/api/auth/loginApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export function useLoginMutation(
  getValues: () => LoginAdminRequest,
) {
  const {setAuth} = useAuthStore()
  const router = useRouter(); 
  const { mutate: loginAdminMutation, isPending } = useMutation({
    mutationFn: async () => {
      const { email, password } = getValues();
      return await loginApi({email, password});
    },
    onSuccess: (res) => {
      setAuth(res?.data?.username, res?.data?.email, res?.data?.objectId);
      // localStorage.setItem('auth', JSON.stringify({email: res?.data?.email, username: res?.data?.username})); 
      toast.success('Authentication user successful');
      router.push('/admin');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    loginAdminMutation,
    isPending,
  };
}
