"use client";

import { useState } from "react";
import AlbumSlideshow from "../AlbumSlideshow";

export default function ModalWrapper({
  album,
  children,
}: {
  album: any;
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* The clickable element (e.g., image) */}
      <div onClick={() => setModalOpen(true)}>{children}</div>

      {/* The modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <AlbumSlideshow album={album} onClose={() => setModalOpen(false)} />
        </div>
      )}
    </>
  );
}
