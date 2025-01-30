<script lang="ts" setup>
import { useUserAgent } from '~/composables/useUserAgent';
import geoip from 'geoip-lite';

const params = useRoute().params;

interface LinkData {    
    id: number;
    ifsk: string;
    created_at: string;
    original_url: string;
    total_clicks: number | null; // Pode ser null
    user_id: string;
}

interface ClickData {
    link_id: number;
    ip?: string;
    country?: string; // Pode ser undefined
    city?: string; // Pode ser undefined
    user_agent?: string;
}

const client = useSupabaseClient();

if (!params.id){
    throw createError({
        statusCode:404,
        message:"Não foi possível encontrar a página"
    })
}

const {data,error} = await useAsyncData<LinkData>('link', async () => {
    const {data,error} =  await client
        .from("links")
        .select("*")
        .eq("ifsk", params.id)
        .single();

    if(error){
        throw createError({
        statusCode:404,
        message:"Não foi possível encontrar a página"
    })
    }
    console.log(error);
    return data;
});

console.log(data.value?.original_url)

if(data.value?.original_url){
    const ua = useUserAgent();
    if (ua && ua.ip) {

       const geoLocation =  geoip.lookup(ua.ip);
       const clickData: ClickData = {
            link_id: data.value.id,
            ip: ua.ip,
            country: geoLocation?.country,
            city: geoLocation?.city,
            user_agent: ua.userAgent,
        };
       const {data:clickDataResponse, error: clickError} = await client
        .from("clicks")
        .insert([clickData]);

        if(clickError){
            console.error('Erro ao inserir dados: ', clickError);
        }else{
            console.log("Dados de clique inseridos com sucesso: ", clickDataResponse)
        }
    }

    await useExternalRedirect(data.value?.original_url);
};

</script>

<template>
    <div  class="pt-[200px]">
        <!-- <h1>Parâmetros:</h1>
        <pre>{{ params }}</pre>
        <h1>Dados:</h1>
        <pre>{{ data }}</pre>
        <div v-if="error">
            <p class="text-red-500">{{ error.message }}</p>
        </div> -->
    </div>
</template>