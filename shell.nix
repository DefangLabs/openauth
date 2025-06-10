{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.buf
    pkgs.bun
    pkgs.nixfmt
    pkgs.nodejs_20
    pkgs.pulumi-bin
    pkgs.hasura-cli
    pkgs.nixfmt
    pkgs.stripe-cli
  ];
}
