<script lang="ts" setup>
import { nanoid } from 'nanoid';
import type { Database } from '~/database.types';


const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const form = reactive({
    url: "",
    ifsk: "",
});

const emit = defineEmits(["created"])

const handleLinkForm = async () =>{

    try {

        const {data, error} = await client.from('links').insert({
            original_url:form.url,
            ifsk:form.ifsk,
            user_id:user.value?.id,
        });
        
        if (error){
            alert('Erro ao encurtar link!');
            console.error(error);
            return;
        }

        createIFShortKey();
        form.url = "";
        alert('Link encurtado como sucesso!')
        emit('created', 1)
                
    } catch (error) {
        
    }

};

const createIFShortKey = (len:number = 6):void => {
    form.ifsk = nanoid(6)
}

onMounted( () => {
    createIFShortKey();
});

</script>

<template>
    <div class="card">
        <form @submit.prevent="handleLinkForm">
            <div class="flex gap-5 items-end">
                <div class="w-5/12">
                    <label for="url">ORIGINAL URL:</label>
                    <input class="text-black.mamba font-bold" type="text" id="url" v-model="form.url"/>
                </div>
                <div class="w-5/12">
                    <label for="IFSK">IF SHORT KEY:</label>
                    <input class="text-black.mamba font-bold" type="text" id="IFSK" v-model="form.ifsk">
                </div>
                <div class="w-1/6">
                    <button class="btn-primary px-2 py-2 my-2 rounded-md w-full">Encurtar</button>
                </div>
            </div>
        </form>
    </div>
</template>