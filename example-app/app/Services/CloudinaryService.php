<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{
    protected $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
    }

    public function upload($file, $folder = null)
    {
        $options = $folder ? ['folder' => $folder] : [];
        $result = $this->cloudinary->uploadApi()->upload($file->getRealPath(), $options);
        return $result['secure_url'];
    }
}
