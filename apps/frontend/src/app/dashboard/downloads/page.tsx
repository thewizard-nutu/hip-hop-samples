'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { Card, Button, Badge, Skeleton } from '@/components/ui';
import { Download, Product } from '@/types';
import ApiClient from '@/lib/api-client';
import { formatDate } from '@/lib/utils';

interface DownloadWithProduct extends Download {
  product?: Product;
}

export default function DownloadsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [downloads, setDownloads] = useState<DownloadWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get<{ items: DownloadWithProduct[] }>('/downloads');
        setDownloads(response.data.items);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch downloads');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchDownloads();
    }
  }, [isAuthenticated]);

  const handleDownload = async (download: DownloadWithProduct) => {
    try {
      const response = await ApiClient.get(`/downloads/${download.id}/url`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${download.product?.title || 'sample'}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Downloads</h1>

      {error && (
        <Card variant="outlined">
          <div className="text-center py-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : downloads.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⬇️</div>
              <h2 className="text-lg font-semibold mb-2">No downloads yet</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Purchase samples to download them here
              </p>
            </div>
          </Card>
        ) : (
          downloads.map((download) => (
            <Card key={download.id}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{download.product?.title || 'Sample'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Downloaded on {formatDate(download.downloadedAt)}
                  </p>
                  {download.expiresAt && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Expires: {formatDate(download.expiresAt)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" size="sm">MP3</Badge>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDownload(download)}
                  >
                    ⬇️ Download
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
