<script lang="ts" setup>

const supabaseAuth = useSupabaseClient();
const isLoggingIn = ref<boolean>(true);
const form = reactive({
    email:"",
    password:"",
});

const errors = ref<string>("")
const showError = ref<boolean>(true); 

const setError = (message: string) => {
    errors.value = message;
    showError.value = false; // Exibir a mensagem de erro
    setTimeout(() => {
        showError.value = true; // Ocultar a mensagem após 5 segundos

    }, 5000);
    console.log(showError.value)
};


const handleGoogleLogin = () =>{
    supabaseAuth.auth.signInWithOAuth({
        provider:'google',
        options:{
            redirectTo:'/dashboard',
        }
    })
}

console.log(supabaseAuth.auth)

const handleLoginForm = async () =>{
    if (!form.email || !form.password){
        setError("Preencha os campos para autenticação");
        return;
    }

    if(!isLoggingIn.value){
        return handleSignUp();
    }

    try{
        const {data,error} = await supabaseAuth.auth.signInWithPassword({
            email:form.email,
            password:form.password,
        });
        if(error){
            setError("Credenciais Inválidas");
            return
        }
    console.log({data})
    useRouter().push('/dashboard');
    }catch(error){
        setError(`Algo deu errado: ${error}`)
    }
}

const handleSignUp = async () => {

    try {
        const {data, error} = await supabaseAuth.auth.signUp({
            email: form.email,
            password:form.password,
        });

        if(error){
            setError("Usuário já registrado!");
            return;
        }
        alert('Cadastro realizado com sucesso!')
        console.log({data});
    }catch (err){
        setError(`Algo deu errado: ${err}`)
    }
}

</script>

<template>
    <section class="h-screen grid place-content-center">
        <div class="container">
            <div class="card">
                <template v-if="isLoggingIn">
                <div class="flex justify-center">
                    <div class="flex justify-center w-10 h-10 items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path 
                                fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                            </path>
                            <path 
                                fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                            </path>
                            <path 
                                fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                            </path>
                            <path 
                                fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                            </path>
                        </svg>
                    </div>
                </div>
                <button 
                    class="btn btn-secondary w-full"
                    @click="handleGoogleLogin">
                        Continue com Google
                 </button>
                </template>
                <template v-else>
                    <div class="flex flex-col justify-center items-center">
                        <h1 class="text-center uppercase text-delft.blue font-bold">Nova conta</h1>
                    </div>
                </template>
                <hr class="border-delft.blue/30 my-8">
                <form @submit.prevent="handleLoginForm">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input
                            v-model="form.email" 
                            type="email"
                            placeholder="name@email.com"
                            appearance-none block
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Senha:</label>
                        <input 
                            v-model="form.password"
                            type="password"
                            placeholder="Digite a sua senha"
                        >                        
                    </div>
                    <button 
                        type="submit"
                        class="btn btn-primary w-full mt-5">
                        <template v-if="isLoggingIn">Login</template>
                        <template v-else>Cadastrar</template>
                    </button>
                    <div class="text-center mt-5">
                        <template v-if="isLoggingIn">
                            <span class="text-delft.blue">Primeiro acesso? Clique </span>
                            <button 
                                type="button"
                                class="font-extrabold text-saffron"
                                @click="isLoggingIn = !isLoggingIn"
                                >      
                            AQUI
                            </button>
                        </template>
                        <template v-else>
                            <button 
                                type="button"
                                class="font-extrabold text-saffron"
                                @click="isLoggingIn = !isLoggingIn"
                                >      
                            Voltar
                            </button>
                        </template>
                    </div>
                    <div v-if="!showError" class="text-red-700 font-bold text-center mt-3">{{ errors }}</div>
                </form>
            </div>
        </div>
    </section> 
</template>