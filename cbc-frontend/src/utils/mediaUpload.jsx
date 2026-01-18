import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(url,key)

export function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve,reject)=>{

            if(file == null){
                reject("No File Selectes")
                return
            }

            const timeStamp = new Date().getTime()
            const newName = timeStamp+file.name

            supabase.storage.from("cbc-images").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("cbc-images").getPublicUrl(newName).data.publicUrl
                console.log(publicUrl)
                resolve(publicUrl)
            }).catch(
                (e)=>{
                    console.log(e)
                    reject("Error occured in supabase connection")
                }
            )
        }
    )
    
    return mediaUploadPromise;
}