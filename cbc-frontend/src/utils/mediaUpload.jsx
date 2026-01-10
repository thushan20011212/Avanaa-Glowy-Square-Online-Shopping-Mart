import { createCleint } from "@supabase/supabase.js"

const url="https://trmgenkqkdglgnwherca.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybWdlbmtxa2RnbGdud2hlcmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMTMyOTQsImV4cCI6MjA4MzU4OTI5NH0.QJKjbOXJGO9hOKtf2EOnsmQJK_HvzfabOUVnLxPbC-U"

const supabase = createCleint(url,key)

export default function mediaUpload(file){

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
}