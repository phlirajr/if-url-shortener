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

// const handleGoogleLogin = () =>{
//     supabaseAuth.auth.signInWithOAuth({
//         provider:'google',
//         options:{
//             redirectTo:'/dashboard',
//         }
//     })
// }

const handleLoginForm = async () =>{
    if (!form.email || !form.password){
        setError("Preencha os campos para autenticação");
        return;
    }

    // if(!isLoggingIn.value){
    //     return handleSignUp();
    // }

    try{
        const {data, error} = await supabaseAuth.auth.signInWithPassword({
            email:form.email,
            password:form.password,
        });
        if(error){
            setError("Credenciais Inválidas");
            form.email = "",
            form.password= ""
            return
        }
        if(data){
            console.log(data);
            useRouter().push({
                name:'dashboard'
            });
        }
    }catch(error){
        setError(`Erro de autenticação. Verifique seus dados e tente novamente.`)
        console.log(error)
    }
}

// const handleSignUp = async () => {

//     try {
//         const {data, error} = await supabaseAuth.auth.signUp({
//             email: form.email,
//             password:form.password,
//         });

//         if(error){
//             setError("Usuário já registrado!");
//             return;
//         }
//         alert('Cadastro realizado com sucesso!')
//         console.log({data});
//     }catch (err){
//         setError(`Algo deu errado: ${err}`)
//     }
// }

watch(isLoggingIn, (newValue) => {
    if (!newValue) {
        useRouter().push("signup")
        };
    });

</script>

<template>
    <section class="h-screen grid place-content-center">
        <div class="container">
            <div class="card">
                <div class="flex justify-center">
                    <div class="flex justify-center boreder rounded-full border-2 w-10 h-10 items-center mb-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            class="size-6">
                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" 
                            />
                        </svg>
                    </div>
                </div>
                    <div class="flex flex-col justify-center items-center">
                        <h1 class="text-center uppercase text-delft.blue font-bold">Login</h1>
                    </div>
                <hr class="border-delft.blue/30 my-4">
                <form @submit.prevent="handleLoginForm">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input
                            v-model="form.email" 
                            type="email"
                            placeholder="name@email.com"
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
                        Login
                    </button>
                    <div class="text-center mt-5">
                            <span class="text-delft.blue">Primeiro acesso? Clique </span>
                            <button 
                                type="button"
                                class="font-extrabold text-saffron"
                                @click="isLoggingIn = !isLoggingIn"
                                >      
                            AQUI
                            </button>
                    </div>
                    <div v-if="!showError" class="text-red-700 font-bold text-center mt-3">{{ errors }}</div>
                </form>
            </div>
        </div>
    </section> 
</template>