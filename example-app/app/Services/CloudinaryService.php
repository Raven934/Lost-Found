<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{
    protected Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
        ]);
    }

    public function upload($file, $folder = null)
    {
        $options = $folder ? ['folder' => $folder] : [];

        $result = $this->cloudinary
            ->uploadApi()
            ->upload($file->getRealPath(), $options);

        return $result['secure_url'];
    }
}
