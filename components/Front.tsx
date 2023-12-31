"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import TypewriterEffect from '@/components/TypewriterEffect';
import { getProfile } from "@/app/sanity/sanity.query";
import type { ProfileType } from "@/app/types";
import Logo from "@/app/icons/logo.png";

export default function Home() {
    const [profile, setProfile] = useState<ProfileType[]>([]);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const profileData: ProfileType[] = await getProfile();
        setProfile(profileData);
      };
  
      fetchProfile();
    }, []);
  
    return (
      <main className="max-w-7xl mx-auto lg:px-16 px-6">
        <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
          {/* Assuming Image is imported and styled correctly */}
          <Image src={Logo} width={300} height={100} alt="logo" className='rounded-3xl' />
          <br />
          {profile.length > 0 && (
            <div key={profile[0]._id} className="lg:max-w-2xl max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full"> Hello <TypewriterEffect text={profile[0].headline} />
              </h1>
  
              <p className="text-base text-zinc-400 leading-relaxed">{profile[0].shortBio}</p>
            </div>
          )}
        </section>
      </main>
    );
  }
  