"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AboutBtn() {
  return (
    <Dialog>
      <DialogTrigger>About</DialogTrigger>
      <DialogContent className="bg-stone-950/50 backdrop-blur-sm border-gray-700/35">
        <DialogHeader>
          <DialogTitle>
            <div className="w-full text-center p-4">About</div>
           </DialogTitle>
          <DialogDescription>
          Hey there , this is Amanuel Garomsa . I built this tiny app in order to demonstrate the development of custom search engines , and how we can integrate them to any other apps.
            The workings of this app are simple and streight forward . you'll insert a content to search and also a site to search from  . The app will scrape the contents of pages of the website and searchs whatever you are looking for . and outputs it in an eye catching way. 
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
