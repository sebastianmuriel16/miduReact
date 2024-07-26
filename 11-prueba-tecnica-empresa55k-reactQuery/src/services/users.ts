const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }) => {
  const response = await fetch(
    `https://randomuser.me/api/?results=10&seed=SebastianMuriel&page=${pageParam}`
  );
  const data = await response.json();
  return {
    users: data.results,
    totalPages: 10,
  };
};

export { fetchUsers };
