<script lang="ts" setup>

    const user = useSupabaseUser();
    const isLoggedIn = user.value;
    console.log(isLoggedIn)
    const client = useSupabaseClient();
    
    const navLinks = ref<{
        to: string,
        label: string
    }[]>([
        {
            to:'/',
            label:'Home'
        },
        {
            to:'/about',
            label:'About'
        },
        {
            to:'/contact',
            label:'Contact'
        }
        
    ])

    const handleLogout = async () => {
        await client.auth.signOut();
        useRouter().push({
            name:"index",
        });
    }

</script>

<template>
    <div class="fixed top-0 left-0 right-0 border-b border-delft_blue/30 bg-blur">
        <nav class="container py-4 flex justify-between">
            <NuxtLink
                :to="{
                    name:'index'
                }"
                class="text-2xl font-bold ">
                IFShorty
            </NuxtLink>
            <ul class="flex items-center gap-4">
                <Li v-for="link in navLinks" :key="link.to"><NuxtLink :to="link.to">{{ link.label }}</NuxtLink></Li>
                <li v-if="isLoggedIn !== null">
                    <button class="btn btn-primary" @click="handleLogout">
                        Sair
                    </button>
                </li>
                <li v-else>
                    <NuxtLink
                        :to="{
                            name:'auth',
                        }"
                        class="btn btn-primary uppercase">
                        Login
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>