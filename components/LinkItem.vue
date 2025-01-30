<script lang="ts" setup>

const props = defineProps<{
    link:{
        ifsk: string;
        url: string;
        id: number;
        total_clicks: number;
    };
}>();

const config = useRuntimeConfig();

const handleCopy = () => {
    navigator.clipboard.writeText(`${config.public.appURL}/${props.link.ifsk}`);
    alert('Link copiado!');
}

</script>

<template>
    <div class="card flex justify-between my-5">
        <div class="link-info">
            <NuxtLink
                :to="`/dashboard/${link.ifsk}`"
                class="text-saffron font-extrabold text-2xl">
                /{{ link.ifsk }}
            </NuxtLink>
            <div
                class="text-sm text-black_mamba font-bold">
                {{ link.url.slice(0,25)+"..." }}
            </div>
        </div>
        <div class="flex gap-5 items-center">
            <div class="text-xl inline-flex items-center">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="size-6 mr-2">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                    />
                </svg>
                {{ link.total_clicks }}
            </div>
            <button 
                class="btn-secondary rounded-full w-12 h-12 grid place-content-center p-2"
                @click="handleCopy()"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor"
                    class="size-6"
                >
                <path
                    stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" 
                    />
                </svg>
            </button>
        </div>
    </div>
</template>