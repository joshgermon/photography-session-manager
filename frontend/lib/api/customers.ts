export type Customer = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string | null;
};

export async function getCustomers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/customers`,
  );
  const data = await res.json();
  return data.data;
}
