import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1AIekG6EXkYAaS6S1hS7fpxAcker-30BZ27gXQ5pj-kLyLdhGhMuyJrG7RAC39i-BRA/exec'; 

export async function GET() {
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?type=parking`);
    const data = await res.json();
    const headers = data.data[0]; 
    const Parking = data.data.slice(1); 

    const formattedData = Parking.map((row: any) => {
      const booking: { [key: string]: any } = {};
      headers.forEach((header: string, index: number) => {
        booking[header] = row[index];
      });
      return booking;
    });
    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

