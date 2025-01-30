<script setup lang="ts">

const user = useSupabaseUser();
console.log(user)
</script>

<template>
    <section class="h-screen grid place-content-center">
        <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl font-bold uppercase heading"> Torne seus links mais curtos e fáceis de compartilhar com IF URL Shortener</h1>
            <p class="my-10 text-lg w-10/12 md:w-2/3 mx-auto font-bold text-black_mamba uppercase">A solução completa para gerenciar e otimizar seus links, tudo em um só lugar.</p>
            <button @click="useRouter().push('dashboard')" class="btn btn-primary uppercase"> 
                Começar
            </button>
            </div>         
    </section>
</template>