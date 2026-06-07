#!/bin/bash

# ─── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

WORKSPACE_DIR="$(cd "$(dirname "$0")" && pwd)"

# ─── Arrow-key menu ───────────────────────────────────────────────────────────
# Writes the NUMERIC index of the chosen item into the variable named $1.
# Bug fix: do NOT declare the target variable local inside callers —
# menu_select sets it via eval which works in the current (global) scope.
menu_select() {
  local _ms_var=$1
  local _ms_title=$2
  shift 2
  local _ms_opts=("$@")
  local _ms_count=${#_ms_opts[@]}
  local _ms_sel=0

  tput civis
  echo -e "\n  ${BOLD}${_ms_title}${NC}\n"

  for i in "${!_ms_opts[@]}"; do
    if [ $i -eq $_ms_sel ]; then
      echo -e "  ${CYAN}❯${NC} ${BOLD}${_ms_opts[$i]}${NC}"
    else
      echo -e "    ${DIM}${_ms_opts[$i]}${NC}"
    fi
  done
  echo -e "\n  ${DIM}↑/↓ to move, Enter to select${NC}"

  while true; do
    read -rsn1 _ms_key
    if [[ $_ms_key == $'\x1b' ]]; then
      read -rsn2 _ms_key
      case $_ms_key in
        '[A') ((_ms_sel--)); [ $_ms_sel -lt 0 ] && _ms_sel=$((_ms_count - 1)) ;;
        '[B') ((_ms_sel++)); [ $_ms_sel -ge $_ms_count ] && _ms_sel=0 ;;
      esac
    elif [[ $_ms_key == "" ]]; then
      break
    fi

    tput cuu $((_ms_count + 2)); tput el
    for i in "${!_ms_opts[@]}"; do
      tput el
      if [ $i -eq $_ms_sel ]; then
        echo -e "  ${CYAN}❯${NC} ${BOLD}${_ms_opts[$i]}${NC}"
      else
        echo -e "    ${DIM}${_ms_opts[$i]}${NC}"
      fi
    done
    tput el; echo -e "\n  ${DIM}↑/↓ to move, Enter to select${NC}"
  done

  tput cnorm
  tput cuu $((_ms_count + 3))
  for ((i = 0; i <= _ms_count + 3; i++)); do tput el; tput cud1; done
  tput cuu $((_ms_count + 4))
  echo -e "  ${GREEN}✔${NC} ${BOLD}${_ms_title}${NC} → ${CYAN}${_ms_opts[$_ms_sel]}${NC}"

  # Write result into the caller's variable (no local declaration needed in callers)
  eval "$_ms_var=$_ms_sel"
}

# ─── Banner ───────────────────────────────────────────────────────────────────
print_banner() {
  clear
  echo -e "${CYAN}"
  echo "  ╔══════════════════════════════════════════════╗"
  echo "  ║        Arshdeep's Dev Workspace              ║"
  echo "  ║  Portfolio · Studio · Links · Blogs          ║"
  echo "  ╚══════════════════════════════════════════════╝"
  echo -e "${NC}"
}

# ─── Project selector ─────────────────────────────────────────────────────────
# Projects:  0=portfolio  1=studio  2=links  3=blogs  4=blogs-studio(Sanity)
ANGULAR_PROJECTS=("Portfolio  (4200)" "Studio.Arshdeep  (4300)" "Links Hub  (4400)" "Blogs  (4500)")
ALL_PROJECTS=("Portfolio  (4200)" "Studio.Arshdeep  (4300)" "Links Hub  (4400)" "Blogs  (4500)" "Sanity Blog Studio  (3333)")

project_key_from_index() {
  case $1 in
    0) echo "portfolio" ;;
    1) echo "studio" ;;
    2) echo "links" ;;
    3) echo "blogs" ;;
    4) echo "sanity" ;;
  esac
}

project_port_from_key() {
  case $1 in
    portfolio) echo 4200 ;;
    studio)    echo 4300 ;;
    links)     echo 4400 ;;
    blogs)     echo 4500 ;;
    sanity)    echo 3333 ;;
  esac
}

# ─── Serve single project ─────────────────────────────────────────────────────
serve_project() {
  _choice=0
  menu_select _choice "Select project to serve" "${ALL_PROJECTS[@]}"
  local project; project=$(project_key_from_index $_choice)
  local port;    port=$(project_port_from_key "$project")

  echo -e "\n  ${GREEN}▶ Serving ${BOLD}$project${NC}${GREEN} on http://localhost:$port${NC}\n"

  cd "$WORKSPACE_DIR" || exit

  if [ "$project" = "sanity" ]; then
    cd "$WORKSPACE_DIR/projects/blogs-studio" && npm run dev
  else
    npx ng serve "$project" --port "$port" --open
  fi
}

# ─── Build single project ─────────────────────────────────────────────────────
build_project() {
  _choice=0
  menu_select _choice "Select project to build" "${ANGULAR_PROJECTS[@]}"
  local project; project=$(project_key_from_index $_choice)

  _cfg_choice=0
  menu_select _cfg_choice "Build configuration" "Production" "Development"
  local config="production"
  [ "$_cfg_choice" = "1" ] && config="development"

  echo -e "\n  ${GREEN}▶ Building ${BOLD}$project${NC}${GREEN} [$config]...${NC}\n"
  cd "$WORKSPACE_DIR" && npx ng build "$project" --configuration "$config"

  if [ $? -eq 0 ]; then
    echo -e "\n  ${GREEN}✔ Build complete → dist/$project${NC}"
  else
    echo -e "\n  ${RED}✖ Build failed.${NC}"
  fi
}

# ─── Build all Angular projects ───────────────────────────────────────────────
build_all() {
  echo -e "\n  ${GREEN}▶ Building all Angular projects...${NC}\n"
  cd "$WORKSPACE_DIR" || exit

  local projects=("portfolio" "studio" "links" "blogs")
  local labels=("Portfolio" "Studio" "Links" "Blogs")
  local statuses=()

  for i in "${!projects[@]}"; do
    echo -e "  ${CYAN}[$((i+1))/${#projects[@]}]${NC} Building ${labels[$i]}..."
    npx ng build "${projects[$i]}"
    statuses+=($?)
    echo ""
  done

  local all_ok=true
  for i in "${!projects[@]}"; do
    if [ "${statuses[$i]}" -ne 0 ]; then
      echo -e "  ${RED}✖ ${labels[$i]} build failed.${NC}"
      all_ok=false
    else
      echo -e "  ${GREEN}✔ ${labels[$i]} built OK${NC}"
    fi
  done

  $all_ok && echo -e "\n  ${GREEN}✔ All projects built successfully!${NC}"
}

# ─── Serve all projects ───────────────────────────────────────────────────────
serve_all() {
  echo -e "\n  ${GREEN}▶ Starting all dev servers...${NC}"
  echo -e "  ${CYAN}Portfolio${NC}          → http://localhost:4200"
  echo -e "  ${CYAN}Studio.Arshdeep${NC}    → http://localhost:4300"
  echo -e "  ${CYAN}Links Hub${NC}          → http://localhost:4400"
  echo -e "  ${CYAN}Blogs${NC}              → http://localhost:4500"
  echo -e "  ${YELLOW}(Sanity studio starts separately via 'Serve a project')${NC}\n"

  cd "$WORKSPACE_DIR" || exit

  npx ng serve portfolio --port 4200 &  local pid1=$!
  npx ng serve studio    --port 4300 &  local pid2=$!
  npx ng serve links     --port 4400 &  local pid3=$!
  npx ng serve blogs     --port 4500 &  local pid4=$!

  echo -e "\n  ${YELLOW}Press Ctrl+C to stop all servers.${NC}\n"
  trap "kill $pid1 $pid2 $pid3 $pid4 2>/dev/null; echo -e '\n  ${RED}All servers stopped.${NC}'; exit" INT
  wait $pid1 $pid2 $pid3 $pid4
}

# ─── Serve specific combo ─────────────────────────────────────────────────────
serve_combo() {
  echo -e "\n  ${DIM}Space = toggle, Enter = confirm${NC}\n"
  echo -e "  ${BOLD}Select projects to run together:${NC}\n"

  local labels=("Portfolio (4200)" "Studio (4300)" "Links (4400)" "Blogs (4500)" "Sanity Studio (3333)")
  local keys=("portfolio" "studio" "links" "blogs" "sanity")
  local ports=(4200 4300 4400 4500 3333)
  local selected=(0 0 0 0 0)
  local cursor=0
  local count=${#labels[@]}

  tput civis
  for i in "${!labels[@]}"; do
    echo -e "  [ ] ${DIM}${labels[$i]}${NC}"
  done
  echo -e "\n  ${DIM}↑/↓ move · Space toggle · Enter start${NC}"

  redraw_combo() {
    tput cuu $(( count + 2 ))
    for i in "${!labels[@]}"; do
      tput el
      local box="[ ]"; [ "${selected[$i]}" -eq 1 ] && box="${GREEN}[✔]${NC}"
      if [ $i -eq $cursor ]; then
        echo -e "  ${CYAN}❯${NC} $box ${BOLD}${labels[$i]}${NC}"
      else
        echo -e "    $box ${DIM}${labels[$i]}${NC}"
      fi
    done
    tput el; echo -e "\n  ${DIM}↑/↓ move · Space toggle · Enter start${NC}"
  }

  while true; do
    read -rsn1 _key
    if [[ $_key == $'\x1b' ]]; then
      read -rsn2 _key
      case $_key in
        '[A') ((cursor--)); [ $cursor -lt 0 ] && cursor=$(( count - 1 )) ;;
        '[B') ((cursor++)); [ $cursor -ge $count ] && cursor=0 ;;
      esac
    elif [[ $_key == " " ]]; then
      selected[$cursor]=$(( 1 - selected[$cursor] ))
    elif [[ $_key == "" ]]; then
      break
    fi
    redraw_combo
  done

  tput cnorm

  local pids=()
  cd "$WORKSPACE_DIR" || exit

  for i in "${!keys[@]}"; do
    [ "${selected[$i]}" -eq 0 ] && continue
    local k="${keys[$i]}"
    local p="${ports[$i]}"
    echo -e "  ${GREEN}▶ Starting $k on :$p${NC}"
    if [ "$k" = "sanity" ]; then
      (cd "$WORKSPACE_DIR/projects/blogs-studio" && npm run dev) &
    else
      npx ng serve "$k" --port "$p" &
    fi
    pids+=($!)
  done

  if [ ${#pids[@]} -eq 0 ]; then
    echo -e "\n  ${YELLOW}No projects selected.${NC}"
    return
  fi

  echo -e "\n  ${YELLOW}Press Ctrl+C to stop.${NC}\n"
  trap "kill ${pids[*]} 2>/dev/null; echo -e '\n  ${RED}Stopped.${NC}'; exit" INT
  wait "${pids[@]}"
}

# ─── Other utilities ──────────────────────────────────────────────────────────
install_deps() {
  echo -e "\n  ${GREEN}▶ Installing monorepo dependencies...${NC}\n"
  cd "$WORKSPACE_DIR" && npm install
  echo -e "\n  ${CYAN}▶ Installing Sanity studio dependencies...${NC}\n"
  cd "$WORKSPACE_DIR/projects/blogs-studio" && npm install --legacy-peer-deps
}

clean_install() {
  echo -e "\n  ${YELLOW}▶ Removing node_modules...${NC}\n"
  cd "$WORKSPACE_DIR" || exit
  rm -rf node_modules package-lock.json
  rm -rf "$WORKSPACE_DIR/projects/blogs-studio/node_modules"
  rm -rf "$WORKSPACE_DIR/projects/blogs-studio/package-lock.json"
  echo -e "  ${GREEN}▶ Reinstalling...${NC}\n"
  npm install
  cd "$WORKSPACE_DIR/projects/blogs-studio" && npm install --legacy-peer-deps
  echo -e "\n  ${GREEN}✔ Clean install complete!${NC}"
}

run_tests() {
  _choice=0
  menu_select _choice "Select project to test" "${ANGULAR_PROJECTS[@]}"
  local project; project=$(project_key_from_index $_choice)
  echo -e "\n  ${GREEN}▶ Running tests for ${BOLD}$project${NC}\n"
  cd "$WORKSPACE_DIR" && npx ng test "$project" --watch=false
}

clean_dist() {
  echo -e "\n  ${YELLOW}▶ Cleaning build output...${NC}"
  cd "$WORKSPACE_DIR" && rm -rf dist out-tsc
  echo -e "  ${GREEN}✔ Cleaned dist/ and out-tsc/${NC}"
}

# ─── Main loop ────────────────────────────────────────────────────────────────
MAIN_OPTIONS=(
  "🚀  Serve a single project"
  "🎛️   Serve custom combo (pick multiple)"
  "🚀  Serve ALL projects"
  "📦  Build a single project"
  "📦  Build ALL projects"
  "📥  Install dependencies"
  "🧹  Clean & reinstall deps"
  "🧪  Run tests"
  "🗑️   Clean build output (dist/)"
  "👋  Exit"
)

while true; do
  print_banner
  _main_choice=0
  menu_select _main_choice "What would you like to do?" "${MAIN_OPTIONS[@]}"

  case $_main_choice in
    0) serve_project ;;
    1) serve_combo ;;
    2) serve_all ;;
    3) build_project ;;
    4) build_all ;;
    5) install_deps ;;
    6) clean_install ;;
    7) run_tests ;;
    8) clean_dist ;;
    9)
      echo -e "\n  ${CYAN}Bye! 👋${NC}\n"
      exit 0
      ;;
  esac

  # Don't pause after serve commands (they block until Ctrl+C)
  if [[ $_main_choice != 0 ]] && [[ $_main_choice != 1 ]] && [[ $_main_choice != 2 ]]; then
    echo ""
    read -rp "  Press Enter to continue..." _
  fi
done
