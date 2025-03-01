export default function UserMessages({ params }: { params: { userid: string } }) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Chat with {params.userid}</h1>
        <div className="mt-4 border p-4 rounded-lg">
          <p>Message history with {params.userid} will appear here...</p>
        </div>
      </div>
    );
  }
  