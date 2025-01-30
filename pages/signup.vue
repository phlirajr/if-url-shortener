<script lang="ts" setup>

const user = useSupabaseClient();
const form = reactive({
    name:"",
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

const handleSignUp = async () => {

try {
    const {data, error} = await user.auth.signUp({
        email: form.email,
        password:form.password,
    });

    if(error){
        setError("Usuário já registrado!");
        return;
    }
    alert('Cadastro realizado com sucesso!')
    handleLogout();
    console.log({data});
}catch (err){
    setError(`Algo deu errado: ${err}`)
}
}

const goHome = () => {    
    useRouter().push({
        name:"index"
    }); // Redireciona para a página inicial

};

const handleLogout = async () => {
        await user.auth.signOut();
        useRouter().push({
            name:"index",
        });
    }

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
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" 
                        />
                    </svg>
                    </div>
                </div>
                    <div class="flex flex-col justify-center items-center">
                        <h1 class="text-center uppercase text-delft.blue font-bold">nova conta</h1>
                    </div>
                <hr class="border-delft.blue/30 my-4">
                <form @submit.prevent="handleSignUp">
                    <div class="form-group">
                        <label for="email">Nome:</label>
                        <input
                            v-model="form.name" 
                            type="text"
                            placeholder="Digite seu nome"
                        />
                    </div>
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
                        Cadastrar
                    </button>
                    <div class="text-center mt-5">
                            <button 
                                type="button"
                                class="font-extrabold text-saffron uppercase" 
                                @click="goHome"                               >      
                            voltar
                            </button>
                    </div>
                    <div v-if="!showError" class="text-red-700 font-bold text-center mt-3">{{ errors }}</div>
                </form>
            </div>
        </div>
    </section> 
</template>