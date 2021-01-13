<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use msztorc\LaravelEnv\Env;
use Illuminate\Support\Str;

class MakeCredentials extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'websockets:credentials';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate credentials for app authentication.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $env = new Env();
        $this->comment('Generating credentials...');

        try {
            $env->setValue('PUSHER_APP_ID', Str::random(16));
            $env->setValue('PUSHER_APP_KEY', Str::random(32));
            $env->setValue('PUSHER_APP_SECRET', Str::random(64));
            $env->setValue('PUSHER_APP_CLUSTER', 'mt1');

            $this->info("All done!");
        } catch (\Throwable $th) {
            $this->error('Something went wrong!');
        }

        return 0;
    }
}
