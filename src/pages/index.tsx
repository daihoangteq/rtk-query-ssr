import {
  getListPost,
  getRunningQueriesThunk,
  useGetListPostQuery,
} from "@/stores/queries/list";
import { wrapper } from "@/stores/store";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const { data } = useGetListPostQuery("", {
    skip: router.isFallback,
  });
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {Array.isArray(data) &&
        data.map((item) => {
          return <div key={item.name}>{item.name}</div>;
        })}
    </main>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const res = await store.dispatch(getListPost.initiate(""));
    if (res.status === "fulfilled") {
      await Promise.all(store.dispatch(getRunningQueriesThunk()));
    }
    return {
      props: {},
    };
  }
);
