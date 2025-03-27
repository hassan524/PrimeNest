'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppContext } from '@/context/context';
import AOS from 'aos';

const FilterSection = () => {
  const { SetProperties, OriginolProperties } = useAppContext();
  const router = useRouter();

  const [filters, setFilters] = useState({
    bedrooms: '',
    bathrooms: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    if (!OriginolProperties) return;
    
    const filteredProperties = OriginolProperties.filter(prop => {
      return (
        (filters.bedrooms ? prop.bedrooms === Number(filters.bedrooms) : true) &&
        (filters.bathrooms ? prop.bathrooms === Number(filters.bathrooms) : true) &&
        (filters.minPrice ? prop.price >= Number(filters.minPrice) : true) &&
        (filters.maxPrice ? prop.price <= Number(filters.maxPrice) : true)
      );
    });

    SetProperties(filteredProperties);
  };

  return (
    <div className="rounded-xl flex flex-col gap-6">
      <div className="flex justify-start gap-3">
        <span className="py-2 px-6 rounded-2xl bg-slate-100 cursor-pointer" onClick={() => router.push('/properties/ForSale')} data-aos="fade-up" data-aos-duration="1000">Sale</span>
        <span className="py-2 px-6 rounded-2xl bg-slate-100 cursor-pointer" onClick={() => router.push('/properties/ForRent')} data-aos="fade-up" data-aos-duration="1400">Rent</span>
      </div>

      <div className="md:!hidden !flex flex-col gap-4">
        <Swiper spaceBetween={4} slidesPerView={2.5} className="w-full pb-4">
          <SwiperSlide data-aos="fade-up" data-aos-duration="1000">
            <Select onValueChange={(value) => handleFilterChange('bedrooms', value)}>
              <SelectTrigger className="w-full rounded-2xl bg-transparent">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </SwiperSlide>

          <SwiperSlide data-aos="fade-up" data-aos-duration="1400">
            <Select onValueChange={(value) => handleFilterChange('bathrooms', value)}>
              <SelectTrigger className="w-full rounded-2xl bg-transparent">
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </SwiperSlide>

          <SwiperSlide data-aos="fade-up" data-aos-duration="1800">
            <Input type="number" placeholder="Min Price" className="w-full rounded-2xl border px-3 py-2" onChange={(e) => handleFilterChange('minPrice', e.target.value)} />
          </SwiperSlide>

          <SwiperSlide data-aos="fade-up" data-aos-duration="2200">
            <Input type="number" placeholder="Max Price" className="w-full rounded-2xl border px-3 py-2" onChange={(e) => handleFilterChange('maxPrice', e.target.value)} />
          </SwiperSlide>
        </Swiper>
      </div>

      <Button className="bg-gray-900 md:hidden flex w-40 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all" onClick={handleSearch} data-aos="fade-up" data-aos-duration="2600">Search</Button>

      <div className="!hidden md:!flex md:flex-wrap gap-4">
        <Select onValueChange={(value) => handleFilterChange('bedrooms', value)}>
          <SelectTrigger className="w-48 rounded-2xl bg-transparent">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>

        <Select data-aos="fade-up" data-aos-duration="1000" onValueChange={(value) => handleFilterChange('bathrooms', value)}>
          <SelectTrigger className="w-48 rounded-2xl bg-transparent">
            <SelectValue placeholder="Bathrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>

        <Input type="number" placeholder="Min Price" className="w-48 rounded-2xl border px-3 py-2" onChange={(e) => handleFilterChange('minPrice', e.target.value)} />
        <Input type="number" placeholder="Max Price" className="w-48 rounded-2xl border px-3 py-2" onChange={(e) => handleFilterChange('maxPrice', e.target.value)} />
        <Button className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all" onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default FilterSection;
